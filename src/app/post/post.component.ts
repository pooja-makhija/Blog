import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostPayload } from '../add-post/post-payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  postId: Number;

  posts: Observable<Array<PostPayload>>;
  constructor(private postService: PostService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.postId = param["id"];
    })

    console.log(this.postId);

    this.postService.getPostById(this.postId).subscribe((res: any) => {
      this.posts = res;
      console.log(this.posts);
    }, error => {
      alert("Unable to fetch records.");
    })
  }

}