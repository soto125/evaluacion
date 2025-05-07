import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';


const app = express();
const port = 3000;
const prisma = new PrismaClient();
// Middleware para manejar JSON en el cuerpo de las solicitudes POST/PUT
app.use(bodyParser.json());


app.get('/contact', async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.contact.update({
      where: {
        id: 1,  // Debe ser único en la tabla
      },
      data: {
        firstName: 'Juan',               // Asegúrate de que estos campos existan
        lastName: 'Pérez', 
        email: 'juanperez_nuevo@example.com',  // Debe ser único
        phone: '1234567890', 
        status: 'active',                // Si 'status' es un enum, asegúrate de que el valor sea válido
      },
    });
    console.log('Usuario actualizado:', updatedUser);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
});

const deletedUser = await prisma.contact.delete({
  where: {
    id:1,
  },
})

const user = await prisma.contact.findUnique({
  where: {
    id: 1,
  },
})

const users = await prisma.contact.findMany()

const newContact = await prisma.contact.create({
  data: {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juanperez@example.com',
    phone: '123456789',
    position: 'Manager',
    companyId: 1,  // Relacionando con una empresa existente
    status: 'active',  // Suponiendo que 'active' es un valor de tu enum Status
  },
});

// Ruta con parámetro de ruta (ID)
app.get('/contact/:id', (req: Request, res: Response) => {
  const contactId = req.params.id;  // Acceder al parámetro de la ruta
  res.send(`Detalles del contacto con ID: ${contactId}`);
});

// Ruta con parámetro de consulta (query params)
app.get('/opportunities ', (req: Request, res: Response) => {
  const stage = req.query.stage;  // Acceder al parámetro de consulta
  res.send(`Oportunidades en el estado: ${stage}`);
});

// Ruta POST para crear un contacto
app.post('/contact', (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;  // Acceder al cuerpo de la solicitud
  res.send(`Contacto creado: ${firstName} ${lastName} con email ${email}`);
});

// Ruta PUT para actualizar un contacto
app.put('/contact/:id', (req: Request, res: Response) => {
  const contactId = req.params.id;  // Acceder al parámetro de la ruta
  const { firstName, lastName, email } = req.body;  // Acceder al cuerpo de la solicitud
  res.send(`Contacto ${contactId} actualizado: ${firstName} ${lastName} con email ${email}`);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
