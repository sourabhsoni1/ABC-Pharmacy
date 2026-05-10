using Microsoft.AspNetCore.Mvc;
using AbcPharmacy.Api.Managers.Sales;
using AbcPharmacy.Api.Models;

namespace AbcPharmacy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly ISaleManager _saleManager;

    public SalesController(ISaleManager saleManager)
    {
        _saleManager = saleManager;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_saleManager.GetAll());

    [HttpPost]
    public IActionResult RecordSale([FromBody] SaleRequest request)
    {
        var (sale, error) = _saleManager.RecordSale(request.MedicineId, request.QuantitySold);
        if (error != null) return BadRequest(error);
        return Ok(sale);
    }
}
