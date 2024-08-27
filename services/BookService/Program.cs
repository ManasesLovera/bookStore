using BookService.Data;
using BookService.Interface;
using BookService.Services;
using Microsoft.EntityFrameworkCore;
using OrderService.Repository;

var builder = WebApplication.CreateBuilder(args);

// Database connection
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// InMemory connection
builder.Services.AddDbContext<InMemoryContext>(options =>
    options.UseInMemoryDatabase("InMemoryDatabase"));

// Add services to the container.

builder.Services.AddScoped<IBookRepository, BookRepository>();

builder.Services.AddControllers();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingConfig));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
