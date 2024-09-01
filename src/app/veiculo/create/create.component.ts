import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../veiculo.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;
  errorMessages: string[] = [];
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;

  constructor(
    private postService: PostService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      placa: new FormControl('', [Validators.required]),
      chassi: new FormControl('', [Validators.required]),
      renavam: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      ano: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.postService.create(this.form.value).subscribe(
        (res: any) => {
          localStorage.setItem('successMessage', 'Veículo cadastrado com sucesso!');
          this.router.navigateByUrl('veiculo/index');
        },
        (error: any) => {
          // console.error('Erro ocorreu:', error);
          this.errorMessages = this.extractErrorMessages(error);
          this.openErrorModal();
        }
      );
    }
  }

  extractErrorMessages(error: any): string[] {
    // Verifique se a resposta de erro contém os erros esperados
    if (error.error && error.error.errors) {
      return Object.values(error.error.errors)
        .flat()
        .filter((msg): msg is string => typeof msg === 'string');
    }
    return ['Um erro inesperado ocorreu.']; // Mensagem genérica se `errors` não estiver definido
  }

  openErrorModal() {
    this.modalService.open(this.errorModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }
}