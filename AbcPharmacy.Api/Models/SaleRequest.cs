namespace AbcPharmacy.Api.Models;

public class SaleRequest
{
    public Guid MedicineId { get; set; }
    public int QuantitySold { get; set; }
}
