namespace Terra1.Server.Models
{
    public class Checkpoint
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public PointType? Type { get; set; }
        public byte[]? Photo { get; set; }
    }
}
