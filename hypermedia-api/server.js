const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // 🔧 Fixed: correct spelling (was 'bodyparser')

const dotenv = require("dotenv");
const multer = require("multer"); // 🔧 Added for file uploads
const path = require("path"); // 🔧 Added for file extension handling
const fs = require("fs"); // 🔧 Added to check/create uploads folder

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1330; // 🔧 Moved up for better readability

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//🔧 Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🔧 Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage }); // 🔧 Multer initialized

// Routes
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to the Node Hypermedia Sameer h1 tag</h1>");
// });

app.post("/message1", async (req, res) => {
  // 🔧 Removed extra 5000ms parameter from setTimeout
  res.setTimeout(5000, () => {
    res.send(`<div><h3>Hello World</h3></div>`);
  });
});

app.post("/echo", async (req, res) => {
  const { email, pass } = req.body; // 🔧 Clean destructuring
  console.log("Email:", email);
  console.log("Password:", pass);
  res.send(`<div><b>Email:</b> ${email} <br><b>Password:</b> ${pass}</div>`); // 🔧 Cleaned formatting
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.log("File uploaded to:", filePath);
    res.send(`<b>Upload successful</b>: ${filePath}`);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("Something went wrong during file upload.");
  }
});

app.get("/", (req, res) => {
 
    res.send("<h1>You Are hacked</h1>");
 
});
app.post("/messages2", async (req, res) => {
  res.set({"Last-Modified":"Tuesday, 02 July 2025"});

  res.send(`<div><h3>Hello World Create</h3></div>`);
});

app.post("/echopayload", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  console.log("Email:", email);
  res.send(`<div><b>Email:</b>${email},<b>Password:</b>${pass}</h3></div>`);
});

app.post("/messages3", async (req, res) => {
  res.send(`<div><h3 id="target2" hx-swap-oob="true">Hello World Create</h3>
    This goes intoi Main target
    
    </div>`);
});
app.post("/messages4", async (req, res) => {
  res.send(`<div><h3 id="target2">Hello World Create</h3>
    This goes intoi Main target
    
    </div>`);
});
// 🔧 Server start log
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.post("/htmx", async (req, res) => {
  res.send(`<div>
    <h3 id="target2">Hello World Create</h3>
     <button hx-get="http://localhost:1330" 
      hx-target="#destination">Load Root</button>
    
    
    </div>`);
});
app.post("/script", async (req, res) => {
  res.send(`<div>
    <h3> I am loading a script</h3>
     <script>
      console.log("Script loaded successfully!");
      </script>
    </div>`);
});


app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" }

  ]);
}
);
