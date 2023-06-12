using FluentValidation;

namespace Auth.Model.Validators
{
    public class UserValidator : AbstractValidator<RegistrationRequest>
    {
        public UserValidator()
        {
            RuleFor(user => user.FirstName).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(user => user.LastName).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(user => user.UserName).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.");
            RuleFor(user => user.Email).EmailAddress().WithMessage("'{PropertyName}' is invalid.");
            RuleFor(user => user.Password).NotEmpty().NotNull().WithMessage("{PropertyName} should be not empty.").MinimumLength(8)
                .Matches("[A-Z]+").WithMessage("'{PropertyName}' must contain one or more capital letters.")
                .Matches("[a-z]+").WithMessage("'{PropertyName}' must contain one or more lowercase letters.")
                .Matches(@"(\d)+").WithMessage("'{PropertyName}' must contain one or more digits.")
                .Matches(@"[""!@$%^&*(){}:;<>,.?/+\-_=|'[\]~\\]").WithMessage("'{PropertyName}' must contain one or more special characters.");
            RuleFor(user => user.ConfirmPassword).NotEmpty().NotNull().WithMessage("'{PropertyName}' should be not empty.")
                .Equal(user => user.Password).WithMessage("'Password' and 'Confirm Password' should match.");


        }
    }
}
