using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Categoria")]
public class Categoria
{
    [Key]
    [Column("idCategoria")]
    public int IdCategoria {get; set;}

  
    [Column("categoria")]
    [Required]
    public string NombreCategoria {get; set;} = string.Empty;


    [Column("fecha_registro")]
    public DateTime? FechaRegistro {get ; set;} = DateTime.Now;


    [Column("fecha_actualizacion")]
    public DateTime? FechaActualizacion {get ; set;}


    [Column("estatus")]
    public int Estatus {get ; set;}
}

public class CrearCategoriaDTO
{
    public string Categoria {get; set;} = string.Empty;
}