import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista 
      ? this.filtraEventos(this.filtroLista)
      : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  imgLargura = 50;
  imgMargem = 2;
  mostraImg = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  filtraEventos(filtrarPor : string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      x => x.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alteraImg(){
    this.mostraImg = !this.mostraImg;
  }

  getEventos(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.eventos = response;
  }, error => {
    console.log(error);
    });
  }

}
