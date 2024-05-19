import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BatchList = () => {
    const [batches, setBatches] = useState([]);
    const [batch, setBatch] = useState('');
    const [fees, setFees] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentBatch, setCurrentBatch] = useState(null);

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        const res = await axios.get('http://localhost:5000/api/batches');
        setBatches(res.data);
    };

    const addBatch = async () => {
        await axios.post('http://localhost:5000/api/batches', { Batch: batch, Fees: fees });
        setBatch('');
        setFees('');
        fetchBatches();
    };

    const deleteBatch = async (batch) => {
        await axios.delete(`http://localhost:5000/api/batches/${batch}`);
        fetchBatches();
    };

    const editBatch = (batch) => {
        setEditing(true);
        setCurrentBatch(batch);
        setBatch(batch.Batch);
        setFees(batch.Fees);
    };

    const updateBatch = async () => {
        await axios.put(`http://localhost:5000/api/batches/${currentBatch.Batch}`, { Batch: batch, Fees: fees });
        setEditing(false);
        setBatch('');
        setFees('');
        setCurrentBatch(null);
        fetchBatches();
    };

    return (
        <div>
            <h1>Batch Management CRUD Operation for Batch Management </h1>
          
            <div>
            <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Batch"
            />
            <input
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Fees"
            />
            {editing ? (
                <button onClick={updateBatch}>Update Batch</button>
            ) : (
                <button onClick={addBatch}>Add Batch</button>
            )}
            <ul>
                {batches.map(b => (
                    <li key={b._id}>
                        {b.Batch } - { b.Fees}
                        <button
                style={{ marginRight: '5px', backgroundColor: 'blue', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                onClick={() => editBatch(b)}>Edit</button>
                        <button onClick={() => deleteBatch(b.Batch)}
                                        style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' ,marginBottom :'10px'}}
                        >Delete</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default BatchList;
