import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// a2dlAXVIBnHNd8Ie

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://preyanshjain13:XI53YuKk7NeNrKjF@cluster0.trggr6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Err Occurred', err);
  });

const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
  date: String,
  address: { type: String, required: true },
  domain: { type: String, required: true },
  image: {
    type: String,
    default: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

// Create a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Update an existing employee
app.put('/api/employees/:id', async (req, res) => {
    try {
    //   console.log(req.body, req.params.id)
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    // console.log(req.params);
    res.json({ message: `Employee deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: `Employee not found  ${req.params.id}` });
  }
});

app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT + '...');
});
