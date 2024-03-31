﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Terra1.Server.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<Terra1ServerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Terra1ServerContext") ?? throw new InvalidOperationException("Connection string 'Terra1ServerContext' not found.")));

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll",
       builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
