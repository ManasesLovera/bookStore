using BookService.DTOs;
using FluentValidation;

namespace BookService.Validations;

    public class BookUpdateValidator : AbstractValidator<BookUpdateDto>
    {
        public BookUpdateValidator()
        {
        #region Title
        RuleFor(t => t.Title).NotEmpty().WithMessage("This field is required {PropertyName}")
                             .MinimumLength(5).WithMessage("Must be more than 5 characters for update {PropertyName}");

        RuleFor(x => x.Title).NotEqual(x => x.Author).WithMessage("In order to update the title, the author must be different");
        #endregion

        #region Description
        RuleFor(x => x.Description).NotEmpty().WithMessage("To update this field it cannot be null {PropertyName}");
        RuleFor(x => x.Description).MinimumLength(6).WithMessage("Requires more than 6 characters to update");
        #endregion

        #region Author
        RuleFor(x => x.Author).NotEmpty().WithMessage("To update this field it cannot be null {PropertyName}");
        RuleFor(x => x.Author).MinimumLength(5).WithMessage("Requires more than 5 characters to update");
        #endregion

        #region Price
        RuleFor(x => x.Price).NotEmpty().WithMessage("To update this field it cannot be null {PropertyName}");
        RuleFor(x => x.Price).GreaterThan(0).WithMessage("Must be more than 0 characters");
        #endregion

    }

}

