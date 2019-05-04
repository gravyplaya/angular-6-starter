import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tag } from "../../shared/models/tag.model";
import { Post } from "../../shared/models/post.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(term: string = null): Observable<any> {
    return this.http.get<any>(`/api/tags?q=${term == null ? "" : term}`);
    // return this.http.post<any>(`/api/`, {"method": "getaddresses", "params": []});
  }
  getTagById(_id: String): Observable<any> {
    return this.http.get<any>(`/api/tag/${_id}`);
  }

  getAddys(term: string = null): Observable<any> {
    // return this.http.get<Tag[]>(`/api/tags?q=${term == null ? '' : term}`);
    return this.http.post<any>(`/api/`, { method: "getaddresses", params: [] });
  }

  createAddy(term: string = null): Observable<any> {
    // return this.http.get<Tag[]>(`/api/tags?q=${term == null ? '' : term}`);
    return this.http.post<any>(`/api/`, {
      method: "getnewaddress",
      params: []
    });
  }

  getPermsByAddy(_addy: String): Observable<any> {
    return this.http.post<any>(`/api/`, {
      method: "listpermissions",
      params: ["all", _addy]
    });

    //     return this.http.get<Tag>(`/api/tag/${_id}`);
  }

  setPermsByAddy(_addy: String, _perms: any): Observable<any> {
    return this.http.post<any>(`/api/`, {
      method: "grant",
      params: [_addy, _perms]
    });

    //     return this.http.get<Tag>(`/api/tag/${_id}`);
  }

  countTags(): Observable<number> {
    return this.http.get<number>("/api/tags/count");
  }

  addTag(tag: Tag): Observable<any> {
    return this.http.post<Tag>("/api/tag", tag);
  }

  getTag(tag: Tag): Observable<any> {
    return this.http.get<Tag>(`/api/tag/${tag._id}`);
  }

  editTag(tag: Tag): Observable<string> {
    return this.http.put(`/api/tag/${tag._id}`, tag, {
      responseType: "text"
    });
  }

  deleteTag(tag: Tag): Observable<string> {
    return this.http.delete(`/api/tag/${tag._id}`, {
      responseType: "text"
    });
  }

  getTagPosts(_id: String, page): Observable<Post> {
    return this.http.get<Post>(
      `/api/tag/${_id}/posts?page=${page == null ? 1 : page}`
    );
  }
}
