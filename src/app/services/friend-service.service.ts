import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Friend } from '../models/friend';


@Injectable({
  providedIn: 'root'
})
export class FriendService {
    url = 'http://localhost:4002/friends';

    constructor(private http: HttpClient) { }

    getFriends(page: number, limit:number): Observable<{friends: Friend[], totalPages:number}> {
        const url = `${this.url}/all?page=${page}&limit=${limit}`;
        return this.http.get<any>(url).pipe(
            map(res=>{
                return{
                    friends: res.docs,
                    totalPages: res.totalPages
                }
            })
        );
    }

    getFriend(id: any): Observable<Friend> {
        return this.http.get<Friend>(this.url + '/' + id);
    }

    getFriendsOfUser(id?: string): Observable<{friends: Friend[]}> {
        return this.http.get<any>(this.url + '/user/' + id).pipe(
            map(res=>{
                return{
                    friends: res.friends
                }
            })
        );
    }

    createFriend(friend: Friend): Observable<Friend> {
        return this.http.post<Friend>(this.url, friend);
    }

    deleteFriend(id?: string): Observable<Friend> {
        console.log("HERE"+ id);
        return this.http.delete<Friend>(this.url + '/' + id);
    }

    editFriend(id?: string, Friend?: Friend): Observable<Friend> {
        return this.http.put<Friend>(this.url + '/' + id, Friend);
    }
}