import React, { useState, useEffect } from 'react';
import locationService from '../../services/location.service';
import './LocationSelector.css';

const LocationSelector = ({ value, onChange, required = false, label = "Location" }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [cells, setCells] = useState([]);
    const [villages, setVillages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState({
        province: null,
        district: null,
        sector: null,
        cell: null,
        village: null
    });

    useEffect(() => {
        loadProvinces();
    }, []);

    const loadProvinces = async () => {
        try {
            setLoading(true);
            const response = await locationService.getProvinces();
            setProvinces(response.data || []);
        } catch (error) {
            console.error('Error loading provinces:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        if (!provinceId) {
            resetSelection();
            return;
        }

        setSelected({
            province: provinceId,
            district: null,
            sector: null,
            cell: null,
            village: null
        });

        try {
            setLoading(true);
            const response = await locationService.getChildren(provinceId, 'DISTRICT');
            setDistricts(response.data || []);
            setSectors([]);
            setCells([]);
            setVillages([]);
        } catch (error) {
            console.error('Error loading districts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        if (!districtId) {
            setSelected({ ...selected, district: null, sector: null, cell: null, village: null });
            setSectors([]);
            setCells([]);
            setVillages([]);
            return;
        }

        setSelected({
            ...selected,
            district: districtId,
            sector: null,
            cell: null,
            village: null
        });

        try {
            setLoading(true);
            const response = await locationService.getChildren(districtId, 'SECTOR');
            setSectors(response.data || []);
            setCells([]);
            setVillages([]);
        } catch (error) {
            console.error('Error loading sectors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectorChange = async (e) => {
        const sectorId = e.target.value;
        if (!sectorId) {
            setSelected({ ...selected, sector: null, cell: null, village: null });
            setCells([]);
            setVillages([]);
            return;
        }

        setSelected({
            ...selected,
            sector: sectorId,
            cell: null,
            village: null
        });

        try {
            setLoading(true);
            const response = await locationService.getChildren(sectorId, 'CELL');
            setCells(response.data || []);
            setVillages([]);
        } catch (error) {
            console.error('Error loading cells:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCellChange = async (e) => {
        const cellId = e.target.value;
        if (!cellId) {
            setSelected({ ...selected, cell: null, village: null });
            setVillages([]);
            return;
        }

        setSelected({
            ...selected,
            cell: cellId,
            village: null
        });

        try {
            setLoading(true);
            const response = await locationService.getChildren(cellId, 'VILLAGE');
            setVillages(response.data || []);
        } catch (error) {
            console.error('Error loading villages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVillageChange = (e) => {
        const villageId = e.target.value;
        setSelected({ ...selected, village: villageId });
        if (onChange) {
            onChange(villageId); // Return final location ID to parent
        }
    };

    const resetSelection = () => {
        setSelected({
            province: null,
            district: null,
            sector: null,
            cell: null,
            village: null
        });
        setDistricts([]);
        setSectors([]);
        setCells([]);
        setVillages([]);
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <div className="location-selector">
            {label && <label className="location-label">{label}</label>}

            <div className="location-dropdowns">
                <div className="location-field">
                    <label>Province</label>
                    <select
                        onChange={handleProvinceChange}
                        value={selected.province || ''}
                        required={required}
                        disabled={loading}
                    >
                        <option value="" disabled={provinces.length > 0 && selected.province !== null}>Select Province</option>
                        {provinces.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="location-field">
                    <label>District</label>
                    <select
                        onChange={handleDistrictChange}
                        value={selected.district || ''}
                        required={required}
                        disabled={!selected.province || loading}
                    >
                        <option value="" disabled={districts.length > 0 && selected.district !== null}>Select District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="location-field">
                    <label>Sector</label>
                    <select
                        onChange={handleSectorChange}
                        value={selected.sector || ''}
                        required={required}
                        disabled={!selected.district || loading}
                    >
                        <option value="" disabled={sectors.length > 0 && selected.sector !== null}>Select Sector</option>
                        {sectors.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className="location-field">
                    <label>Cell</label>
                    <select
                        onChange={handleCellChange}
                        value={selected.cell || ''}
                        required={required}
                        disabled={!selected.sector || loading}
                    >
                        <option value="" disabled={cells.length > 0 && selected.cell !== null}>Select Cell</option>
                        {cells.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="location-field">
                    <label>Village</label>
                    <select
                        onChange={handleVillageChange}
                        value={selected.village || ''}
                        required={required}
                        disabled={!selected.cell || loading}
                    >
                        <option value="" disabled={villages.length > 0}>Select Village</option>
                        {villages.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <span className="loading-indicator">Loading...</span>}
        </div>
    );
};

export default LocationSelector;
