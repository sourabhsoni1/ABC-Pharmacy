using AbcPharmacy.Api.Services;
using AbcPharmacy.Api.Managers.Medicines;
using AbcPharmacy.Api.Managers.Sales;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IJsonStorageService, JsonStorageService>();
builder.Services.AddScoped<IMedicineManager, MedicineManager>();
builder.Services.AddScoped<ISaleManager, SaleManager>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
