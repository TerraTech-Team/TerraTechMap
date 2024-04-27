using Terra.Server.Models.enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Terra.Server.Models
{
    public class Way
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public Season Season { get; set; }
        public TransportType Transport { get; set; }
        public double Length { get; set; }
        public int? Time { get; set; }
        public string Color { get; set; }
        public string? Author { get; set; }
        public List<Cordinate> Cordinates { get; set; }


        public static double[] GetWayCenter(List<Cordinate> cordinates)
        {
            var minX = double.MaxValue;
            var maxX = double.MinValue;
            var minY = double.MaxValue;
            var maxY = double.MinValue;

            foreach (var cordinate in cordinates)
            {
                var x = cordinate.Cords[0];
                var y = cordinate.Cords[1];

                if (x < minX)
                    minX = x;
                if (x > maxX)
                    maxX = x;
                if (y < minY)
                    minY = y;
                if (y > maxY)
                    maxY = y;
            }
            var midpoint = new double[]
            {
                (minX + maxX) / 2,
                (minY + maxY) / 2
            };
            return midpoint;
        }
    }

    public class Cordinate
    {
        public int Id { get; set; }
        public double[] Cords { get; set; }
        public int WayId { get; set; }
    }
}