using BookService.DTOs;
using FluentValidation;

namespace BookService.Validators;

    public class BookCreateValidator : AbstractValidator<BookCreateDto>
   {

    public BookCreateValidator()
    {
        #region Title
        RuleFor(x => x.Title).NotEmpty().WithMessage("This field is required {PropertyName}")
                              .MinimumLength(5).WithMessage("Must be more than 5 characters");

        RuleFor(x => x.Title).NotEqual(x => x.Author).WithMessage("Author cannot be equal to Title");
        #endregion

        #region Description
        RuleFor(x => x.Description).NotEmpty().WithMessage("This field is required {PropertyName}");
        RuleFor(x => x.Description).MinimumLength(6).WithMessage("Must be more than 6 characters");
        #endregion

        #region Author
        RuleFor(x => x.Author).NotEmpty().WithMessage("This field is required {PropertyName}");
        RuleFor(x => x.Author).MinimumLength(5).WithMessage("Must be more than 3 characters");
        #endregion

        #region Price
        RuleFor(x => x.Price).NotEmpty().WithMessage("This field is required {PropertyName}");
        RuleFor(x => x.Price).GreaterThan(0).WithMessage("Must be more than 0 characters");
        #endregion

        #region Stock
        RuleFor(x => x.Stock).NotEmpty().WithMessage("This field is required {PropertyName}");
        RuleFor(x => x.Stock).GreaterThan(0).WithMessage("Must be more than 0 characters");
        #endregion

    }
}

