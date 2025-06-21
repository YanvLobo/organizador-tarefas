import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  novaTarefa = '';
  tarefas: { nome: string; feita: boolean }[] = [];
  filtroAtual: 'todas' | 'feitas' | 'pendentes' = 'todas';


  constructor() {
    this.carregarTarefas(); //Carrega as tarefas salvas ao iniciar
  }

  adicionarTarefa() {
    if (this.novaTarefa.trim()) {
      this.tarefas.push({ nome: this.novaTarefa.trim(), feita: false });
      this.novaTarefa = '';
      this.salvarTarefas(); //Salva após adicionar
    }
  }

  removerTarefa(index: number) {
    this.tarefas.splice(index, 1);
    this.salvarTarefas(); //Salva após remover
  }

  salvarTarefas() {
    //Transforma a lista em texto e salva no navegador
    const tarefasTexto = JSON.stringify(this.tarefas);
    localStorage.setItem('minhas_tarefas', tarefasTexto);
  }

  carregarTarefas() {
    //Lê as tarefas do navegador, se existirem
    const tarefasTexto = localStorage.getItem('minhas_tarefas');
    if (tarefasTexto) {
      this.tarefas = JSON.parse(tarefasTexto);
    }
  }

  get tarefasFiltradas() {
  if (this.filtroAtual === 'feitas') {
    return this.tarefas.filter(t => t.feita);
  }
  if (this.filtroAtual === 'pendentes') {
    return this.tarefas.filter(t => !t.feita);
  }
  return this.tarefas;
}

}
