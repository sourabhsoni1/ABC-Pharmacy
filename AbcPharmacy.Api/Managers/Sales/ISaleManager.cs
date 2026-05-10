using AbcPharmacy.Api.Models;

namespace AbcPharmacy.Api.Managers.Sales;

public interface ISaleManager
{
    List<SaleRecord> GetAll();
    (SaleRecord? Sale, string? Error) RecordSale(Guid medicineId, int quantitySold);
}
