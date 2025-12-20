package com.app.dto;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {

	private String status;
	private String message;
	private Object data;

	public Response() {
	}

	public Response(String status, String message, Object data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public static ResponseEntity<?> success(Object data) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "success");
		if (data != null)
			map.put("data", data);
		return ResponseEntity.ok(map);
	}

	public static ResponseEntity<?> error(Object err) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "error");
		if (err != null)
			map.put("error", err);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
	}

}
