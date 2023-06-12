using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Model.Validators
{
    public class UpdateUserValidator : AbstractValidator<RegistrationRequest>
    {
        public UpdateUserValidator()
        {
            RuleFor(user => user.FirstName)
                .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.");

            RuleFor(user => user.LastName)
                .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.");

            RuleFor(user => user.UserName)
                .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.");

            RuleFor(user => user.Email)
                .EmailAddress().WithMessage("'{PropertyName}' is invalid.");

            When(user => !string.IsNullOrEmpty(user.Password), () =>
            {
                RuleFor(user => user.Password)
                    .Cascade(CascadeMode.Stop) // Stop validation if password is not provided
                    .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.")
                    .MinimumLength(8).WithMessage("'{PropertyName}' must be at least 8 characters.")
                    .Matches("[A-Z]+").WithMessage("'{PropertyName}' must contain at least one uppercase letter.")
                    .Matches("[a-z]+").WithMessage("'{PropertyName}' must contain at least one lowercase letter.")
                    .Matches(@"(\d)+").WithMessage("'{PropertyName}' must contain at least one digit.")
                    .Matches(@"[""!@$%^&*(){}:;<>,.?/+\-_=|'[\]~\\]").WithMessage("'{PropertyName}' must contain at least one special character.");
            });

            When(user => !string.IsNullOrEmpty(user.Password) && !string.IsNullOrEmpty(user.ConfirmPassword), () =>
            {
                RuleFor(user => user.ConfirmPassword)
                    .NotEmpty().NotNull().WithMessage("'{PropertyName}' should not be empty.")
                    .Equal(user => user.Password).WithMessage("'Password' and 'Confirm Password' should match.");
            });
        }
    }
}
