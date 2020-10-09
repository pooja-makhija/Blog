import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBlogPayload } from '../add-post/get-blog-payload';
import { PostPayload } from '../add-post/post-payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getBlogListPayload: GetBlogPayload;

  posts: Observable<Array<PostPayload>>;
  constructor(private postService:PostService) {

    this.getBlogListPayload ={
      status:'PUBLISHED'
    }
   }

  ngOnInit(): void {

    this.postService.getPostList(this.getBlogListPayload).subscribe((res: any) => {
      console.log(res);
      this.posts = res;
    }, error => {
      alert("Unable to fetch records.");
    })
  }
  

}
