import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare let window: any;
declare let cordova: any;

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;

    constructor(private activatedRoute: ActivatedRoute) {
      console.log('plugins', window.cordova.plugins);
        const options = {
            authorities: [
                {
                    type: 'AAD',
                    audience: 'AzureADandPersonalMicrosoftAccount',
                    cloudInstance: 'MSALAzurePublicCloudInstance',
                    default: true
                }
            ],
            authorizationUserAgent: 'DEFAULT',
            multipleCloudsSupported: false,
            brokerRedirectUri: false,
            accountMode: 'SINGLE',
            scopes: ['User.Read']
        };
        window.cordova.plugins.msalPlugin.msalInit(() => {
                // Success logic goes here
            },
            (err) => {
                // err has your exception message
            }, options);
    }

    ngOnInit() {
      console.log('plugins ngOnInit', window.cordova.plugins);
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

    onLogin() {
        const isAvailable = typeof (cordova.plugins.msalPlugin) !== 'undefined';
        if (isAvailable) {
          window.cordova.plugins.msalPlugin.signInInteractive(
              (msg) => {
                console.log(msg);
                // msg is your JWT for the account the user just signed into
                // Also never use a preposition to end a sentence with
              },
              (err) => {
                  console.log(err);
                // Usually if we get an error it just means the user cancelled the
                // signin process and closed the popup window. Handle this however
                // you want, depending again if you want guest access or not.
              }
          );
        }
    }
}
