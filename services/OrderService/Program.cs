using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using DotNetEnv;
using OrderService.Interface;
using OrderService.Repository;
using OrderService.Services;

var builder = WebApplication.CreateBuilder(args);

Env.Load();
var port = Environment.GetEnvironmentVariable("ORDERSERVICE_PORT") ?? "3033";

// Database connection
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// InMemory connection
builder.Services.AddDbContext<InMemoryContext>(options =>
    options.UseInMemoryDatabase("InMemoryDatabase"));

// Prevent object cycles
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve
    );

// Dependency injection for repositories
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

// Add services to the container.
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
