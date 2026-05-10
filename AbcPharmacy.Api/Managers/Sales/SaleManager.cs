using AbcPharmacy.Api.Models;
using AbcPharmacy.Api.Services;

namespace AbcPharmacy.Api.Managers.Sales;

public class SaleManager : ISaleManager
{
    private readonly IJsonStorageService _storage;

    public SaleManager(IJsonStorageService storage)
    {
        _storage = storage;
    }

    public List<SaleRecord> GetAll() => _storage.GetSales();

    public (SaleRecord? Sale, string? Error) RecordSale(Guid medicineId, int quantitySold)
    {
        if (quantitySold <= 0)
            return (null, "Quantity must be greater than zero.");

        var medicines = _storage.GetMedicines();
        var medicine = medicines.FirstOrDefault(m => m.Id == medicineId);

        if (medicine == null)
            return (null, "Medicine not found.");

        if (medicine.Quantity < quantitySold)
            return (null, "Insufficient stock.");

        medicine.Quantity -= quantitySold;
        _storage.SaveMedicines(medicines);

        var sale = new SaleRecord
        {
            MedicineId = medicine.Id,
            MedicineName = medicine.FullName,
            QuantitySold = quantitySold,
            PricePerUnit = medicine.Price,
            TotalPrice = medicine.Price * quantitySold,
            SaleDate = DateTime.UtcNow
        };

        var sales = _storage.GetSales();
        sales.Add(sale);
        _storage.SaveSales(sales);

        return (sale, null);
    }
}
