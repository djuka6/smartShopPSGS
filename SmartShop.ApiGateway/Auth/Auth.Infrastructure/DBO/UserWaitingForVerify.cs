using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Infrastructure.DBO
{
    public class UserWaitingForVerify
    {
        public Guid Id { get; set; }

        public int Status { get; set; }
    }
}
