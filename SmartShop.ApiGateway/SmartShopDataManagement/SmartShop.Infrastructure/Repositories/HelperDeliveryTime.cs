using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Repositories
{
    public class HelperDeliveryTime
    {
        public static Random random = new Random();
        public static int integerPart = random.Next(1, 7);
        public static int decimalPart = random.Next(0, 60);

        double randomDouble = Convert.ToDouble($"{integerPart}.{decimalPart:D2}");

        public double GetDeliveryTime()
        {
            return randomDouble;
        }

    }
}
