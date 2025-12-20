package com.app.contollers;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Credentials;
import com.app.dto.PlanDto;
import com.app.dto.Response;
import com.app.pojos.Plan;
import com.app.pojos.User;
import com.app.services.IPlanService;
import com.app.services.IUserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TrainerController {

    @Autowired
    IPlanService planService;

    @Autowired
    IUserService userService;

    @RequestMapping("/getTrainerClasses/{trainerName}")
    public ResponseEntity<?> getTrainerClasses(@PathVariable("trainerName") String trainerName) {
        List<Plan> plans = planService.getPlansByTrainerName(trainerName);
        List<PlanDto> planDtos = plans.stream().map(plan -> PlanDto.fromEntity(plan)).collect(Collectors.toList());
        return Response.success(planDtos);
    }

    @RequestMapping("/getTrainerMembers/{trainerName}")
    public ResponseEntity<?> getTrainerMembers(@PathVariable("trainerName") String trainerName) {
        // Get all plans for this trainer
        List<Plan> trainerPlans = planService.getPlansByTrainerName(trainerName);
        List<Integer> planIds = trainerPlans.stream()
                .map(Plan::getId)
                .collect(Collectors.toList());

        // Get all users
        List<User> allUsers = userService.getAllUsers();

        // Filter users who have any of the trainer's plans
        List<User> trainerMembers = allUsers.stream()
                .filter(user -> user.getPlanList() != null &&
                        user.getPlanList().stream()
                                .anyMatch(plan -> planIds.contains(plan.getId())))
                .collect(Collectors.toList());

        List<Credentials> memberDtos = trainerMembers.stream()
                .map(user -> Credentials.allDataTODto(user))
                .collect(Collectors.toList());

        return Response.success(memberDtos);
    }

    @RequestMapping("/getTrainerStats/{trainerName}")
    public ResponseEntity<?> getTrainerStats(@PathVariable("trainerName") String trainerName) {
        // Get trainer's classes count
        List<Plan> trainerPlans = planService.getPlansByTrainerName(trainerName);
        int totalClasses = trainerPlans.size();

        // Get trainer's members count
        List<Integer> planIds = trainerPlans.stream()
                .map(Plan::getId)
                .collect(Collectors.toList());

        List<User> allUsers = userService.getAllUsers();
        long totalMembers = allUsers.stream()
                .filter(user -> user.getPlanList() != null &&
                        user.getPlanList().stream()
                                .anyMatch(plan -> planIds.contains(plan.getId())))
                .count();

        // Create stats object
        TrainerStats stats = new TrainerStats(totalClasses, (int) totalMembers);

        return Response.success(stats);
    }

    // Inner class for stats response
    public static class TrainerStats {
        private int totalClasses;
        private int totalMembers;

        public TrainerStats(int totalClasses, int totalMembers) {
            this.totalClasses = totalClasses;
            this.totalMembers = totalMembers;
        }

        public int getTotalClasses() {
            return totalClasses;
        }

        public void setTotalClasses(int totalClasses) {
            this.totalClasses = totalClasses;
        }

        public int getTotalMembers() {
            return totalMembers;
        }

        public void setTotalMembers(int totalMembers) {
            this.totalMembers = totalMembers;
        }
    }
}
