-- Rwanda Location Sample Data
-- This script provides sample data for testing the cascading location dropdowns
-- Structure: Province → District → Sector → Cell → Village

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM table_location WHERE location_type IN ('PROVINCE', 'DISTRICT', 'SECTOR', 'CELL', 'VILLAGE');

-- ============================================
-- KIGALI CITY
-- ============================================

-- Province: Kigali City
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kigali City', 'KGL', 'PROVINCE', NULL);

SET @kigali_id = LAST_INSERT_ID();

-- Districts in Kigali
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gasabo', 'GASABO', 'DISTRICT', @kigali_id);
SET @gasabo_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kicukiro', 'KICUKIRO', 'DISTRICT', @kigali_id);
SET @kicukiro_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Nyarugenge', 'NYARUGENGE', 'DISTRICT', @kigali_id);
SET @nyarugenge_id = LAST_INSERT_ID();

-- Sectors in Gasabo District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kacyiru', 'KACYIRU', 'SECTOR', @gasabo_id);
SET @kacyiru_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kimironko', 'KIMIRONKO', 'SECTOR', @gasabo_id);
SET @kimironko_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Remera', 'REMERA', 'SECTOR', @gasabo_id);
SET @remera_id = LAST_INSERT_ID();

-- Cells in Kacyiru Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kamatamu', 'KAMATAMU', 'CELL', @kacyiru_id);
SET @kamatamu_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kibagabaga', 'KIBAGABAGA', 'CELL', @kacyiru_id);
SET @kibagabaga_id = LAST_INSERT_ID();

-- Villages in Kamatamu Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kamatamu I', 'KAMATAMU1', 'VILLAGE', @kamatamu_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kamatamu II', 'KAMATAMU2', 'VILLAGE', @kamatamu_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kamatamu III', 'KAMATAMU3', 'VILLAGE', @kamatamu_id);

-- Villages in Kibagabaga Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kibagabaga I', 'KIBAGABAGA1', 'VILLAGE', @kibagabaga_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kibagabaga II', 'KIBAGABAGA2', 'VILLAGE', @kibagabaga_id);

-- Cells in Kimironko Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Bibare', 'BIBARE', 'CELL', @kimironko_id);
SET @bibare_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kibagabaga', 'KIBAGABAGA_KIM', 'CELL', @kimironko_id);
SET @kibagabaga_kim_id = LAST_INSERT_ID();

-- Villages in Bibare Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Bibare I', 'BIBARE1', 'VILLAGE', @bibare_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Bibare II', 'BIBARE2', 'VILLAGE', @bibare_id);

-- Sectors in Kicukiro District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gahanga', 'GAHANGA', 'SECTOR', @kicukiro_id);
SET @gahanga_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gikondo', 'GIKONDO', 'SECTOR', @kicukiro_id);
SET @gikondo_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Niboye', 'NIBOYE', 'SECTOR', @kicukiro_id);
SET @niboye_id = LAST_INSERT_ID();

-- Cells in Gahanga Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Busanza', 'BUSANZA', 'CELL', @gahanga_id);
SET @busanza_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Karembure', 'KAREMBURE', 'CELL', @gahanga_id);
SET @karembure_id = LAST_INSERT_ID();

-- Villages in Busanza Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Busanza I', 'BUSANZA1', 'VILLAGE', @busanza_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Busanza II', 'BUSANZA2', 'VILLAGE', @busanza_id);

-- ============================================
-- EASTERN PROVINCE
-- ============================================

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Eastern Province', 'EAST', 'PROVINCE', NULL);
SET @eastern_id = LAST_INSERT_ID();

-- Districts in Eastern Province
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Rwamagana', 'RWAMAGANA', 'DISTRICT', @eastern_id);
SET @rwamagana_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kayonza', 'KAYONZA', 'DISTRICT', @eastern_id);
SET @kayonza_id = LAST_INSERT_ID();

-- Sectors in Rwamagana District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gahengeri', 'GAHENGERI', 'SECTOR', @rwamagana_id);
SET @gahengeri_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Kigabiro', 'KIGABIRO', 'SECTOR', @rwamagana_id);
SET @kigabiro_id = LAST_INSERT_ID();

-- Cells in Gahengeri Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gahengeri', 'GAHENGERI_CELL', 'CELL', @gahengeri_id);
SET @gahengeri_cell_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Nyakariro', 'NYAKARIRO', 'CELL', @gahengeri_id);
SET @nyakariro_id = LAST_INSERT_ID();

-- Villages in Gahengeri Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gahengeri I', 'GAHENGERI1', 'VILLAGE', @gahengeri_cell_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gahengeri II', 'GAHENGERI2', 'VILLAGE', @gahengeri_cell_id);

-- ============================================
-- SOUTHERN PROVINCE
-- ============================================

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Southern Province', 'SOUTH', 'PROVINCE', NULL);
SET @southern_id = LAST_INSERT_ID();

-- Districts in Southern Province
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Huye', 'HUYE', 'DISTRICT', @southern_id);
SET @huye_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Muhanga', 'MUHANGA', 'DISTRICT', @southern_id);
SET @muhanga_id = LAST_INSERT_ID();

-- Sectors in Huye District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Tumba', 'TUMBA', 'SECTOR', @huye_id);
SET @tumba_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Ngoma', 'NGOMA_HUYE', 'SECTOR', @huye_id);
SET @ngoma_huye_id = LAST_INSERT_ID();

-- Cells in Tumba Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Cyarwa', 'CYARWA', 'CELL', @tumba_id);
SET @cyarwa_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Rango', 'RANGO', 'CELL', @tumba_id);
SET @rango_id = LAST_INSERT_ID();

-- Villages in Cyarwa Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Cyarwa I', 'CYARWA1', 'VILLAGE', @cyarwa_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Cyarwa II', 'CYARWA2', 'VILLAGE', @cyarwa_id);

-- ============================================
-- NORTHERN PROVINCE
-- ============================================

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Northern Province', 'NORTH', 'PROVINCE', NULL);
SET @northern_id = LAST_INSERT_ID();

-- Districts in Northern Province
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Musanze', 'MUSANZE', 'DISTRICT', @northern_id);
SET @musanze_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gicumbi', 'GICUMBI', 'DISTRICT', @northern_id);
SET @gicumbi_id = LAST_INSERT_ID();

-- Sectors in Musanze District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Muhoza', 'MUHOZA', 'SECTOR', @musanze_id);
SET @muhoza_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Cyuve', 'CYUVE', 'SECTOR', @musanze_id);
SET @cyuve_id = LAST_INSERT_ID();

-- Cells in Muhoza Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Muhoza', 'MUHOZA_CELL', 'CELL', @muhoza_id);
SET @muhoza_cell_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Nyarutovu', 'NYARUTOVU', 'CELL', @muhoza_id);
SET @nyarutovu_id = LAST_INSERT_ID();

-- Villages in Muhoza Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Muhoza I', 'MUHOZA1', 'VILLAGE', @muhoza_cell_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Muhoza II', 'MUHOZA2', 'VILLAGE', @muhoza_cell_id);

-- ============================================
-- WESTERN PROVINCE
-- ============================================

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Western Province', 'WEST', 'PROVINCE', NULL);
SET @western_id = LAST_INSERT_ID();

-- Districts in Western Province
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Rubavu', 'RUBAVU', 'DISTRICT', @western_id);
SET @rubavu_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Rusizi', 'RUSIZI', 'DISTRICT', @western_id);
SET @rusizi_id = LAST_INSERT_ID();

-- Sectors in Rubavu District
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gisenyi', 'GISENYI', 'SECTOR', @rubavu_id);
SET @gisenyi_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Rubavu', 'RUBAVU_SECTOR', 'SECTOR', @rubavu_id);
SET @rubavu_sector_id = LAST_INSERT_ID();

-- Cells in Gisenyi Sector
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gisenyi', 'GISENYI_CELL', 'CELL', @gisenyi_id);
SET @gisenyi_cell_id = LAST_INSERT_ID();

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Umuganda', 'UMUGANDA', 'CELL', @gisenyi_id);
SET @umuganda_id = LAST_INSERT_ID();

-- Villages in Gisenyi Cell
INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gisenyi I', 'GISENYI1', 'VILLAGE', @gisenyi_cell_id);

INSERT INTO table_location (name, code, location_type, parent_id) 
VALUES ('Gisenyi II', 'GISENYI2', 'VILLAGE', @gisenyi_cell_id);

-- ============================================
-- Summary of Sample Data
-- ============================================
-- 5 Provinces (all provinces of Rwanda)
-- 11 Districts (representative from each province)
-- 16 Sectors
-- 16 Cells
-- 24 Villages
-- Total: 72 location records
