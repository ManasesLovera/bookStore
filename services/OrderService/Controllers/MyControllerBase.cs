using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace OrderService.Controllers;

public class MyControllerBase : ControllerBase
{
    protected readonly IMapper _mapper;

    public MyControllerBase(IMapper mapper)
    {
        _mapper = mapper;
    }
}