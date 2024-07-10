import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {

  listTarjetas:TarjetaCredito[]=[];


  constructor(private _TarjetaService:TarjetaService,private toastr: ToastrService){


  }

  ngOnInit():void{
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._TarjetaService.obtenerTarjeta().subscribe(data=>{
      this.listTarjetas=[];

      data.forEach((element:any) => {

       this.listTarjetas.push(element);


      });
    })
  }

  eliminarTarjeta(index: any){

    this._TarjetaService.deleteTarjeta(index).then(()=>{
      this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta eliminada')
    }, error=>{
      this.toastr.error('Opss...ocurrió un error', 'error')
    })
    }

    editarTarjeta(tarjeta:TarjetaCredito){
        this._TarjetaService.enviarTarjetaEdit(tarjeta);
    }
  }


