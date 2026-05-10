using AbcPharmacy.Api.Models;
using AbcPharmacy.Api.Services;

namespace AbcPharmacy.Api.Managers.Medicines;

public class MedicineManager : IMedicineManager
{
    private readonly IJsonStorageService _storage;

    public MedicineManager(IJsonStorageService storage)
    {
        _storage = storage;
    }

    public List<Medicine> GetAll() => _storage.GetMedicines();

    public Medicine Add(Medicine medicine)
    {
        medicine.Id = Guid.NewGuid();
        var medicines = _storage.GetMedicines();
        medicines.Add(medicine);
        _storage.SaveMedicines(medicines);
        return medicine;
    }
}
