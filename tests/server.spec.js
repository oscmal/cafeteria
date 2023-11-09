const supertest = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  
  // Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  
  it("Obtener listado de cafés", async () => {
    const { statusCode, body: cafes } = await supertest (server)
      .get("/cafes")
      .send();

    expect(statusCode).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
    expect(cafes.length).toBeGreaterThanOrEqual(1);
  });

  // Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe
  
  it("Error al eliminar un cafe", async () => {
    const idFalso = 5;
    const { statusCode } = await supertest (server)
      .delete(`/cafes/${idFalso}`)
      .set("Authorization", "jwtFalso")
      .send();

    expect(statusCode).toBe(404);
  });

  // Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
  
  it("Agregar un nuevo cafe", async () => {
    const newCafe = {
      id: 5,
      name: "Expreso",
    };

    const { statusCode, body: productos } = await supertest (server)
      .post("/cafes")
      .send(newCafe);

      expect(statusCode).toBe(201);
    // expect(productos).toContainEqual(newCafe)
  });

  // Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
  
  it("Error al actualizar un cafe con id diferente", async () => {
    const id = 1;
    const newCafe = {
      id: 6,
      name: "Late",
    };

    const response = await supertest (server)
      .put(`/cafes/${id}`)
      .send(newCafe);

    expect(response.status).toBe(400);
  });
});
