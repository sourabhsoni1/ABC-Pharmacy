using System.Text.Json;
using AbcPharmacy.Api.Models;

namespace AbcPharmacy.Api.Services;

public class JsonStorageService : IJsonStorageService
{
    private readonly string _medicinesPath;
    private readonly string _salesPath;
    private static readonly JsonSerializerOptions _options = new() { WriteIndented = true };

    public JsonStorageService(IWebHostEnvironment env)
    {
        var dataDir = Path.Combine(env.ContentRootPath, "Data");
        _medicinesPath = Path.Combine(dataDir, "medicines.json");
        _salesPath = Path.Combine(dataDir, "sales.json");
    }

    public List<Medicine> GetMedicines()
    {
        if (!File.Exists(_medicinesPath)) return new List<Medicine>();
        var json = File.ReadAllText(_medicinesPath);
        return JsonSerializer.Deserialize<List<Medicine>>(json) ?? new List<Medicine>();
    }

    public void SaveMedicines(List<Medicine> medicines)
    {
        File.WriteAllText(_medicinesPath, JsonSerializer.Serialize(medicines, _options));
    }

    public List<SaleRecord> GetSales()
    {
        if (!File.Exists(_salesPath)) return new List<SaleRecord>();
        var json = File.ReadAllText(_salesPath);
        return JsonSerializer.Deserialize<List<SaleRecord>>(json) ?? new List<SaleRecord>();
    }

    public void SaveSales(List<SaleRecord> sales)
    {
        File.WriteAllText(_salesPath, JsonSerializer.Serialize(sales, _options));
    }
}
