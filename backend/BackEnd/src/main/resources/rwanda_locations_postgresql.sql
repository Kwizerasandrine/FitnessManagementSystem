-- Rwanda Location Sample Data for PostgreSQL (Conflict-Safe Version)
-- This script provides sample data for testing the cascading location dropdowns
-- It uses "ON CONFLICT (code) DO NOTHING" to avoid duplicate record errors

-- Step 1: Insert Provinces
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES 
    ('Kigali City', 'KGL', 'PROVINCE', NULL),
    ('Eastern Province', 'EAST', 'PROVINCE', NULL),
    ('Southern Province', 'SOUTH', 'PROVINCE', NULL),
    ('Northern Province', 'NORTH', 'PROVINCE', NULL),
    ('Western Province', 'WEST', 'PROVINCE', NULL)
ON CONFLICT (code) DO NOTHING;

-- Step 2: Insert Districts
INSERT INTO table_location (name, code, location_type, parent_id)
SELECT 'Gasabo', 'GASABO', 'DISTRICT', id FROM table_location WHERE code = 'KGL'
UNION ALL
SELECT 'Kicukiro', 'KICUKIRO', 'DISTRICT', id FROM table_location WHERE code = 'KGL'
UNION ALL
SELECT 'Nyarugenge', 'NYARUGENGE', 'DISTRICT', id FROM table_location WHERE code = 'KGL'
UNION ALL
SELECT 'Rwamagana', 'RWAMAGANA', 'DISTRICT', id FROM table_location WHERE code = 'EAST'
UNION ALL
SELECT 'Kayonza', 'KAYONZA', 'DISTRICT', id FROM table_location WHERE code = 'EAST'
UNION ALL
SELECT 'Huye', 'HUYE', 'DISTRICT', id FROM table_location WHERE code = 'SOUTH'
UNION ALL
SELECT 'Muhanga', 'MUHANGA', 'DISTRICT', id FROM table_location WHERE code = 'SOUTH'
UNION ALL
SELECT 'Musanze', 'MUSANZE', 'DISTRICT', id FROM table_location WHERE code = 'NORTH'
UNION ALL
SELECT 'Gicumbi', 'GICUMBI', 'DISTRICT', id FROM table_location WHERE code = 'NORTH'
UNION ALL
SELECT 'Rubavu', 'RUBAVU', 'DISTRICT', id FROM table_location WHERE code = 'WEST'
UNION ALL
SELECT 'Rusizi', 'RUSIZI', 'DISTRICT', id FROM table_location WHERE code = 'WEST'
ON CONFLICT (code) DO NOTHING;

-- Step 3: Insert Sectors
INSERT INTO table_location (name, code, location_type, parent_id)
SELECT 'Kacyiru', 'KACYIRU', 'SECTOR', id FROM table_location WHERE code = 'GASABO'
UNION ALL
SELECT 'Kimironko', 'KIMIRONKO', 'SECTOR', id FROM table_location WHERE code = 'GASABO'
UNION ALL
SELECT 'Remera', 'REMERA', 'SECTOR', id FROM table_location WHERE code = 'GASABO'
UNION ALL
SELECT 'Gahanga', 'GAHANGA', 'SECTOR', id FROM table_location WHERE code = 'KICUKIRO'
UNION ALL
SELECT 'Gikondo', 'GIKONDO', 'SECTOR', id FROM table_location WHERE code = 'KICUKIRO'
UNION ALL
SELECT 'Niboye', 'NIBOYE', 'SECTOR', id FROM table_location WHERE code = 'KICUKIRO'
UNION ALL
SELECT 'Gahengeri', 'GAHENGERI', 'SECTOR', id FROM table_location WHERE code = 'RWAMAGANA'
UNION ALL
SELECT 'Kigabiro', 'KIGABIRO', 'SECTOR', id FROM table_location WHERE code = 'RWAMAGANA'
UNION ALL
SELECT 'Tumba', 'TUMBA', 'SECTOR', id FROM table_location WHERE code = 'HUYE'
UNION ALL
SELECT 'Ngoma', 'NGOMA_HUYE', 'SECTOR', id FROM table_location WHERE code = 'HUYE'
UNION ALL
SELECT 'Muhoza', 'MUHOZA', 'SECTOR', id FROM table_location WHERE code = 'MUSANZE'
UNION ALL
SELECT 'Cyuve', 'CYUVE', 'SECTOR', id FROM table_location WHERE code = 'MUSANZE'
UNION ALL
SELECT 'Gisenyi', 'GISENYI', 'SECTOR', id FROM table_location WHERE code = 'RUBAVU'
UNION ALL
SELECT 'Rubavu', 'RUBAVU_SECTOR', 'SECTOR', id FROM table_location WHERE code = 'RUBAVU'
ON CONFLICT (code) DO NOTHING;

-- Step 4: Insert Cells
INSERT INTO table_location (name, code, location_type, parent_id)
SELECT 'Kamatamu', 'KAMATAMU', 'CELL', id FROM table_location WHERE code = 'KACYIRU'
UNION ALL
SELECT 'Kibagabaga', 'KIBAGABAGA', 'CELL', id FROM table_location WHERE code = 'KACYIRU'
UNION ALL
SELECT 'Bibare', 'BIBARE', 'CELL', id FROM table_location WHERE code = 'KIMIRONKO'
UNION ALL
SELECT 'Kibagabaga', 'KIBAGABAGA_KIM', 'CELL', id FROM table_location WHERE code = 'KIMIRONKO'
UNION ALL
SELECT 'Busanza', 'BUSANZA', 'CELL', id FROM table_location WHERE code = 'GAHANGA'
UNION ALL
SELECT 'Karembure', 'KAREMBURE', 'CELL', id FROM table_location WHERE code = 'GAHANGA'
UNION ALL
SELECT 'Gahengeri', 'GAHENGERI_CELL', 'CELL', id FROM table_location WHERE code = 'GAHENGERI'
UNION ALL
SELECT 'Nyakariro', 'NYAKARIRO', 'CELL', id FROM table_location WHERE code = 'GAHENGERI'
UNION ALL
SELECT 'Cyarwa', 'CYARWA', 'CELL', id FROM table_location WHERE code = 'TUMBA'
UNION ALL
SELECT 'Rango', 'RANGO', 'CELL', id FROM table_location WHERE code = 'TUMBA'
UNION ALL
SELECT 'Muhoza', 'MUHOZA_CELL', 'CELL', id FROM table_location WHERE code = 'MUHOZA'
UNION ALL
SELECT 'Nyarutovu', 'NYARUTOVU', 'CELL', id FROM table_location WHERE code = 'MUHOZA'
UNION ALL
SELECT 'Gisenyi', 'GISENYI_CELL', 'CELL', id FROM table_location WHERE code = 'GISENYI'
UNION ALL
SELECT 'Umuganda', 'UMUGANDA', 'CELL', id FROM table_location WHERE code = 'GISENYI'
ON CONFLICT (code) DO NOTHING;

-- Step 5: Insert Villages
INSERT INTO table_location (name, code, location_type, parent_id)
SELECT 'Kamatamu I', 'KAMATAMU1', 'VILLAGE', id FROM table_location WHERE code = 'KAMATAMU'
UNION ALL
SELECT 'Kamatamu II', 'KAMATAMU2', 'VILLAGE', id FROM table_location WHERE code = 'KAMATAMU'
UNION ALL
SELECT 'Kamatamu III', 'KAMATAMU3', 'VILLAGE', id FROM table_location WHERE code = 'KAMATAMU'
UNION ALL
SELECT 'Kibagabaga I', 'KIBAGABAGA1', 'VILLAGE', id FROM table_location WHERE code = 'KIBAGABAGA'
UNION ALL
SELECT 'Kibagabaga II', 'KIBAGABAGA2', 'VILLAGE', id FROM table_location WHERE code = 'KIBAGABAGA'
UNION ALL
SELECT 'Bibare I', 'BIBARE1', 'VILLAGE', id FROM table_location WHERE code = 'BIBARE'
UNION ALL
SELECT 'Bibare II', 'BIBARE2', 'VILLAGE', id FROM table_location WHERE code = 'BIBARE'
UNION ALL
SELECT 'Busanza I', 'BUSANZA1', 'VILLAGE', id FROM table_location WHERE code = 'BUSANZA'
UNION ALL
SELECT 'Busanza II', 'BUSANZA2', 'VILLAGE', id FROM table_location WHERE code = 'BUSANZA'
UNION ALL
SELECT 'Gahengeri I', 'GAHENGERI1', 'VILLAGE', id FROM table_location WHERE code = 'GAHENGERI_CELL'
UNION ALL
SELECT 'Gahengeri II', 'GAHENGERI2', 'VILLAGE', id FROM table_location WHERE code = 'GAHENGERI_CELL'
UNION ALL
SELECT 'Cyarwa I', 'CYARWA1', 'VILLAGE', id FROM table_location WHERE code = 'CYARWA'
UNION ALL
SELECT 'Cyarwa II', 'CYARWA2', 'VILLAGE', id FROM table_location WHERE code = 'CYARWA'
UNION ALL
SELECT 'Muhoza I', 'MUHOZA1', 'VILLAGE', id FROM table_location WHERE code = 'MUHOZA_CELL'
UNION ALL
SELECT 'Muhoza II', 'MUHOZA2', 'VILLAGE', id FROM table_location WHERE code = 'MUHOZA_CELL'
UNION ALL
SELECT 'Gisenyi I', 'GISENYI1', 'VILLAGE', id FROM table_location WHERE code = 'GISENYI_CELL'
UNION ALL
SELECT 'Gisenyi II', 'GISENYI2', 'VILLAGE', id FROM table_location WHERE code = 'GISENYI_CELL'
ON CONFLICT (code) DO NOTHING;

-- Verify the import
SELECT location_type, COUNT(*) as count
FROM table_location
GROUP BY location_type
ORDER BY 
    CASE location_type
        WHEN 'PROVINCE' THEN 1
        WHEN 'DISTRICT' THEN 2
        WHEN 'SECTOR' THEN 3
        WHEN 'CELL' THEN 4
        WHEN 'VILLAGE' THEN 5
    END;
