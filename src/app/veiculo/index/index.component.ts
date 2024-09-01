import { Component } from '@angular/core';
  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../veiculo.service';
import { Veiculo } from '../veiculo';
  
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  message: string | null = null;
  errorMessages: string[] = [];
  posts: Veiculo[] = [];
  successMessage: string = '';
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Veiculo[])=>{
      this.posts = data;
      this.message = localStorage.getItem('successMessage');
      if (this.message) {
        localStorage.removeItem('successMessage'); // Remove a mensagem após ser exibida
        setTimeout(() => this.message = null, 5000); // Oculta a mensagem após 5 segundos
      }
    })  
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
    })
  }
  
}