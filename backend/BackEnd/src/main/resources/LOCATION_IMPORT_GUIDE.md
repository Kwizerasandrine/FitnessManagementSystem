# Rwanda Location Data Import Guide

## Overview

This guide explains how to import sample Rwanda location data into your database for testing the cascading location dropdowns.

## Sample Data Included

The SQL script contains:
- **5 Provinces** (all provinces of Rwanda)
- **11 Districts** (representative from each province)
- **16 Sectors**
- **16 Cells**
- **24 Villages**
- **Total: 72 location records**

### Coverage by Province:

1. **Kigali City**
   - Districts: Gasabo, Kicukiro, Nyarugenge
   - Includes complete hierarchies down to villages

2. **Eastern Province**
   - Districts: Rwamagana, Kayonza
   
3. **Southern Province**
   - Districts: Huye, Muhanga
   
4. **Northern Province**
   - Districts: Musanze, Gicumbi
   
5. **Western Province**
   - Districts: Rubavu, Rusizi

## Import Methods

### Method 1: Using MySQL Command Line (Recommended)

1. **Open Command Prompt** and navigate to the SQL file location:
   ```bash
   cd c:\Users\patri\OneDrive\Desktop\AUCA\WEBTECH\REACTJS\Final_Project\FitnessManagementSystem_26104\backend\BackEnd\src\main\resources
   ```

2. **Login to MySQL**:
   ```bash
   mysql -u root -p
   ```

3. **Select your database**:
   ```sql
   USE your_database_name;
   ```

4. **Run the SQL script**:
   ```sql
   source rwanda_locations_sample.sql;
   ```

5. **Verify the import**:
   ```sql
   SELECT COUNT(*) FROM table_location;
   SELECT * FROM table_location WHERE location_type = 'PROVINCE';
   ```

### Method 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your database
3. Go to **File** → **Open SQL Script**
4. Navigate to: `c:\Users\patri\OneDrive\Desktop\AUCA\WEBTECH\REACTJS\Final_Project\FitnessManagementSystem_26104\backend\BackEnd\src\main\resources\rwanda_locations_sample.sql`
5. Click the **Execute** button (lightning bolt icon)
6. Verify the data was imported

### Method 3: Using Spring Boot Application

If you want to load this data automatically when the application starts, you can:

1. Rename the file to `data.sql`
2. Add this to your `application.properties`:
   ```properties
   spring.jpa.defer-datasource-initialization=true
   spring.sql.init.mode=always
   ```
3. Restart the Spring Boot application

## Testing the Cascading Dropdowns

After importing the data:

1. **Start your application**
2. **Go to Add Member page**
3. **Test the location dropdowns**:
   - Select "Kigali City" → Should show Gasabo, Kicukiro, Nyarugenge
   - Select "Gasabo" → Should show Kacyiru, Kimironko, Remera
   - Select "Kacyiru" → Should show Kamatamu, Kibagabaga
   - Select "Kamatamu" → Should show Kamatamu I, II, III

## Clearing Existing Data (Optional)

If you want to remove existing location data first, uncomment this line in the SQL file:

```sql
DELETE FROM table_location WHERE location_type IN ('PROVINCE', 'DISTRICT', 'SECTOR', 'CELL', 'VILLAGE');
```

⚠️ **Warning**: This will delete ALL location data. Make sure you have a backup if needed.

## Expanding the Dataset

This is sample data for testing. To add more locations:

1. Follow the same pattern in the SQL file
2. Use the official Rwanda administrative divisions list
3. Maintain the hierarchy: Province → District → Sector → Cell → Village

## Troubleshooting

**Error: "Unknown column 'location_type'"**
- Check that your table schema matches the expected structure
- Verify the column name is correct in your database

**Error: "Duplicate entry"**
- You may have existing data with the same codes
- Either clear existing data or modify the codes in the SQL file

**Dropdowns not cascading**
- Verify the `parent_id` relationships are correct
- Check that the frontend is calling the correct API endpoints
- Ensure the location service is properly filtering by parent_id

## Next Steps

After successfully importing the data:
1. Test all cascading dropdown combinations
2. Create test users with different locations
3. Verify location-based filtering works correctly
4. Consider adding more complete hierarchies as needed

## Full Dataset

If you need the complete Rwanda dataset with all 14,837 villages, you would need to:
1. Obtain official data from Rwanda's National Institute of Statistics
2. Convert it to SQL format
3. Import using the same method

The current sample data is sufficient for development and testing purposes.
