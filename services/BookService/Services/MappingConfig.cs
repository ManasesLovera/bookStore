using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookService.DTOs;
using BookService.Models;

namespace BookService.Services
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<BookCreateDto, Book>().ReverseMap();
        }
    }
}