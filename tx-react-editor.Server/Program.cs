using TXTextControl.Web;
using TXTextControl.Web.MVC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseWebSockets();
app.UseTXWebSocketMiddleware();

app.MapFallbackToFile("/index.html");

app.Run();


