import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '../veiculo';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  
  id!: number;
  post!: Veiculo;
  form!: FormGroup;
  errorMessages: string[] = [];
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
   
    this.postService.find(this.id).subscribe((data: Veiculo)=>{
      console.log(data);
      this.post = data;
    }); 
        
    this.form = new FormGroup({
      placa: new FormControl('', [Validators.required]),
      chassi: new FormControl('', [Validators.required]),
      renavam: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      ano: new FormControl('', Validators.required),
    });
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe(
      (res:any) => {
        localStorage.setItem('successMessage', 'Veículo alterado com sucesso!');
        this.router.navigateByUrl('veiculo/index');
    },
    (error: any) => {
      // console.error('Erro ocorreu:', error);
      this.errorMessages = this.extractErrorMessages(error);
      this.openErrorModal();
    }
    );
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

// submit() {
//   if (this.form.valid) {
//     this.postService.create(this.form.value).subscribe(
//       (res: any) => {
//         this.router.navigateByUrl('veiculo/index');
//       },
//       (error: any) => {
//         // console.error('Erro ocorreu:', error);
//         this.errorMessages = this.extractErrorMessages(error);
//         this.openErrorModal();
//       }
//     );
//   }
// }