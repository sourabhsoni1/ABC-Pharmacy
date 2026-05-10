using Microsoft.AspNetCore.Mvc;
using AbcPharmacy.Api.Models;
using AbcPharmacy.Api.Managers.Medicines;

namespace AbcPharmacy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly IMedicineManager _medicineManager;

    public MedicinesController(IMedicineManager medicineManager)
    {
        _medicineManager = medicineManager;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_medicineManager.GetAll());

    [HttpPost]
    public IActionResult Add([FromBody] Medicine medicine)
    {
        var added = _medicineManager.Add(medicine);
        return CreatedAtAction(nameof(GetAll), new { id = added.Id }, added);
    }
}
