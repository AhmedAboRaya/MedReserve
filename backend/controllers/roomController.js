const Room = require('../models/Room');

exports.addRoom = async (req, res) => {
    const { roomName } = req.body;
    if (!roomName) return res.status(400).json({ msg: 'Enter name of room' }); 

    try {
        const roomExist = await Room.findOne({ roomName });
        if (roomExist) return res.status(400).json({ msg: 'Room already exists' });
        
        const room = new Room({ roomName });
        await room.save();
        
        res.status(201).json(room); 
    } catch (error) {
        res.status(500).json({ msg: 'Server Error, error in creating room' });
    }
}

exports.deleteRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const roomExist = await Room.findById(roomId);
        if (!roomExist) return res.status(404).json({ msg: 'Room does not exist' }); 

        await Room.findByIdAndDelete(roomId); 
        res.json({ msg: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error, error in deleting room' }); // Updated message
    }
}

exports.updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const { roomName } = req.body;

    if (!roomName) return res.status(400).json({ msg: 'Enter name of room' }); 

    try {
        const roomExist = await Room.findById(roomId);
        if (!roomExist) return res.status(404).json({ msg: 'Room does not exist' }); 

        const room = await Room.findByIdAndUpdate(roomId, { roomName }, { new: true });
        res.json(room);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error, error in updating room' }); 
    }
}

exports.allRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error, error in getting rooms' });
    }
}
