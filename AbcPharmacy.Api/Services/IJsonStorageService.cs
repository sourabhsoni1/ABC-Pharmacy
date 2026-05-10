using AbcPharmacy.Api.Models;

namespace AbcPharmacy.Api.Services;

public interface IJsonStorageService
{
    List<Medicine> GetMedicines();
    void SaveMedicines(List<Medicine> medicines);
    List<SaleRecord> GetSales();
    void SaveSales(List<SaleRecord> sales);
}
