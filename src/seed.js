console.log("Starting seed...");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI ? "found" : "NOT FOUND");

const Room = require("./modules/rooms/room.model");
const User = require("./modules/user/user.model");

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne();
    console.log("User found:", user?.name);

    if (!user) {
      console.log("No user found! Register first.");
      process.exit(1);
    }

    await Room.deleteMany({});
    console.log("Cleared existing rooms");

    const rooms = [
      {
        name: "Silent Study Pod",
        description: "Compact silent room ideal for focused solo study and exam preparation.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
        floor: "1st Floor",
        capacity: 2,
        hourlyRate: 4,
        amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets"],
        owner: user._id,
      },
      {
        name: "Collaborative Learning Room",
        description: "Perfect for group assignments with discussion-friendly seating.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        floor: "2nd Floor",
        capacity: 6,
        hourlyRate: 8,
        amenities: ["Whiteboard", "Wi-Fi", "Power Outlets", "Air Conditioning"],
        owner: user._id,
      },
      {
        name: "Research Scholars Hub",
        description: "Quiet study room designed for long research sessions and writing.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
        floor: "3rd Floor",
        capacity: 3,
        hourlyRate: 7,
        amenities: ["Wi-Fi", "Quiet Zone", "Air Conditioning"],
        owner: user._id,
      },
      {
        name: "Presentation Practice Room",
        description: "Practice presentations with projector support and spacious seating.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
        floor: "2nd Floor",
        capacity: 8,
        hourlyRate: 10,
        amenities: ["Projector", "Whiteboard", "Wi-Fi", "Power Outlets"],
        owner: user._id,
      },
      {
        name: "Graduate Study Lounge",
        description: "Comfortable room for postgraduate students and focused teamwork.",
        image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800",
        floor: "4th Floor",
        capacity: 5,
        hourlyRate: 9,
        amenities: ["Quiet Zone", "Wi-Fi", "Air Conditioning"],
        owner: user._id,
      },
      {
        name: "Weekend Reading Corner",
        description: "Relaxed environment for reading books and completing coursework.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        floor: "1st Floor",
        capacity: 4,
        hourlyRate: 5,
        amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets"],
        owner: user._id,
      },
      {
        name: "Tech-Enabled Study Room",
        description: "Modern room equipped for digital learning and collaboration.",
        image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800",
        floor: "5th Floor",
        capacity: 7,
        hourlyRate: 11,
        amenities: ["Projector", "Wi-Fi", "Power Outlets", "Air Conditioning"],
        owner: user._id,
      },
      {
        name: "Innovation Discussion Room",
        description: "Flexible seating space for brainstorming and project planning.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
        floor: "4th Floor",
        capacity: 6,
        hourlyRate: 9,
        amenities: ["Whiteboard", "Wi-Fi", "Power Outlets"],
        owner: user._id,
      },
      {
        name: "Exam Preparation Suite",
        description: "Focused environment designed for intensive exam preparation.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        floor: "2nd Floor",
        capacity: 4,
        hourlyRate: 6,
        amenities: ["Quiet Zone", "Wi-Fi", "Air Conditioning"],
        owner: user._id,
      },
      {
        name: "Library Discussion Chamber",
        description: "Small collaborative room ideal for tutorials and discussions.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
        floor: "5th Floor",
        capacity: 5,
        hourlyRate: 8,
        amenities: ["Whiteboard", "Projector", "Wi-Fi"],
        owner: user._id,
      },
      {
        name: "Focused Reading Space",
        description: "Minimal distraction zone for concentrated reading and writing.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        floor: "1st Floor",
        capacity: 3,
        hourlyRate: 5,
        amenities: ["Quiet Zone", "Wi-Fi", "Power Outlets"],
        owner: user._id,
      },
      {
        name: "Executive Private Study Suite",
        description: "Premium private study suite for uninterrupted focus, thesis work, and research.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        floor: "6th Floor",
        capacity: 1,
        hourlyRate: 18,
        amenities: ["Quiet Zone", "Wi-Fi", "Air Conditioning", "Power Outlets", "Whiteboard"],
        owner: user._id,
      },
    ];

    await Room.insertMany(rooms);
    console.log(`Seeded ${rooms.length} rooms successfully!`);
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seedRooms();