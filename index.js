const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const os = require('os');  
const Tutor = require("./model/tutor");

const app = express();
const port = 3000;

const Student = require("./model/student");
const Discussion = require("./model/discussion")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(express.static("public"));
app.use(express.static("templates"));
app.use(express.static("src"));
app.use(express.static("assets"));

mongoose.connect("mongodb+srv://SharifSheikh:Sharif2402@cluster0.82s5jhu.mongodb.net/student", {
  
})
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.error(e);
    console.log("Database Can't Be Connected");
  });


  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/login-signup.html");
  });


//tutor registration
app.post('/upload-notes-link',async function(req,res){
  try{
    const title = req.body.title
    const caption = req.body.caption
    const notesLink = req.body.notes
    const studentId = req.body.studentId
    const tutor = await Tutor.findOne({studentid:studentId});
    tutor.notes.push({
      title: title,
      caption: caption,
      link: notesLink
    });
    const updatedTutor = await tutor.save();

    console.log('Note uploaded successfully:', updatedTutor);
    res.sendStatus(200);
  }catch(error){
    console.log('Internal server error')
  }
});

app.post('/register-tutor', function(req, res) {
  const subject = req.body.subject;
  const notesLink = req.body.notesLink;
  const studentId = req.body.studentId;

  console.log(subject);
  console.log(notesLink);
  console.log(studentId);

  try{
    const newTutor = new Tutor({
      studentid:studentId,
      subject,
      notes : {
        title: '',
        caption: '',
        link: notesLink
      }
  });

  const response = newTutor.save();
  res.status(201).json({
    res: response
  });
  }catch(error){
    console.log('Internal server error');
  }
});

//discussion

app.get("/get-discussion",async(req,res) => {
  try{
    const discussions = await Discussion.find();
    res.json(discussions);
  }catch(error){
    console.log("Internal server error");
  }
})

app.post("/discussion",async(req,res) => {
  try{
    const message = req.body.message;
    const newDiscussion = new Discussion({
      message:message
    });
    const generatedDiscussion = await newDiscussion.save();
    res.status(201).json({
      res: generatedDiscussion
  });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//student login


app.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password, college } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      username,
      email,
      phone,
      password: hashedPassword, 
      college,
    });

    const savedStudent = await newStudent.save();

    res.status(201).json({
      res: savedStudent
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (student && await bcrypt.compare(password, student.password)) {
      res.status(201).json({
        res: student
    });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
