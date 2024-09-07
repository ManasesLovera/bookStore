using AutoMapper;
using OrderService.DTOs;
using OrderService.Models;

namespace OrderService.Services;

public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<BookCreateDto, Book>().ReverseMap();
    }
}