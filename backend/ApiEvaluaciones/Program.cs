using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "Server=3.140.151.231;Database=Evaluaciones;User Id=aspirante1;Password=aspirante1;Encrypt=False;TrustServerCertificate=false;";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
}

app.MapGet("/api/categorias", async (ApplicationDbContext db) =>
{
    var categorias = await db.Categorias
        .Where(c => c.Estatus == 1)
        .ToListAsync();

    return Results.Ok(categorias);
});

app.MapPost("/api/categorias", async (ApplicationDbContext db, CrearCategoriaDTO dto) =>
{
    if (string.IsNullOrEmpty(dto.Categoria))
    {
        return Results.BadRequest(new { message = "Campo categoria obligatorio" });
    }

    var nuevaCategoria = new Categoria
    {
        NombreCategoria = dto.Categoria,
        FechaRegistro = DateTime.Now,
        Estatus = 1
    };

    db.Categorias.Add(nuevaCategoria);
    await db.SaveChangesAsync();

    return Results.Created($"/api/categorias/{nuevaCategoria.IdCategoria}", nuevaCategoria);
}).WithName("CrearCategoria");

app.Run();

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Categoria> Categorias { get; set; }
}
