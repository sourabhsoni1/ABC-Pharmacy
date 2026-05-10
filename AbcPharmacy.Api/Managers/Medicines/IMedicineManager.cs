using AbcPharmacy.Api.Models;

namespace AbcPharmacy.Api.Managers.Medicines;

public interface IMedicineManager
{
    List<Medicine> GetAll();
    Medicine Add(Medicine medicine);
}
