import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetBlogPayload } from '../add-post/get-blog-payload';
import { PostPayload } from '../add-post/post-payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  getBlogListPayload: GetBlogPayload;

  publishBlogPayload: GetBlogPayload;
  posts: Observable<Array<PostPayload>>;
  constructor(private postService: PostService, private router: Router) {

    this.getBlogListPayload = {
      status: 'DRAFT'
    }

    this.publishBlogPayload = {
      status: 'PUBLISHED'
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


  publishBlog(id) {
    console.log(id);

    this.postService.publishBlog(id, this.publishBlogPayload).subscribe((res: any) => {
      this.router.navigateByUrl("/home");
    }, error => {
      alert("Unable to fetch records.");
    })

  }
}