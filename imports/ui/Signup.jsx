import React from 'react';
import { FilesCollection } from 'meteor/ostrio:files';
//const Resumes = new FilesCollection({collectionName: 'Resumes'});

import Resumes from '../api/resumes'
import { Accounts } from 'meteor/accounts-base'

import { Tracker } from 'meteor/tracker'


const filesCursor = Resumes.find();
//let upload;
export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resumes: [],
            filesCursor: [],
            links: [],
            error: "",
            email: "",
            password: "",
            name: "",
            phone: "",
            city: "",
            resume: "",
            isAdmin: false,
            skills: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateLinks = this.updateLinks.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // this.renderLinks = this.renderLinks.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'email') {
            const email = e.target.value.trim();
            this.setState({ email });
        } else if (e.target.name === 'password') {
            const password = e.target.value.trim();
            let length = e.target.value.length;
            if (length <= 8) {
                this.setState({ error: `password length ${length} ch` })
            } else {
                this.setState({ error: "" })
            }
            this.setState({ password });
        } else if (e.target.name === 'name') {
            const name = e.target.value.trim();
            this.setState({ name });
        } else if (e.target.name === 'phone') {
            const phone = e.target.value.trim();
            this.setState({ phone });
        } else if (e.target.name === 'city') {
            const city = e.target.value.trim();
            this.setState({ city });
        } else if (e.target.name === 'resume') {
            const resume = e.target.files[0];
            this.setState({ resume });
        } else if (e.target.name === 'skills') {
            const skills = e.target.value.trim();
            this.setState({ skills });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let name = this.state.name;
        let phone = this.state.phone;
        let city = this.state.city;
        let resume = this.state.resume;
        console.log(this.state.resume);
        let skills = this.state.skills.split(',');
        var options = {
            email,
            password,
            profile: {
                name,
                city,
                phone,
                resume,
                isAdmmin: false,
                skills
            }
        };
        if (this.state.password.length <= 8) {
            this.setState({ error: `password must be greater than 8 character` })
            return;
        }
        Accounts.createUser(options, (error) => {
            if (error) {
                this.setState({ error: error.reason })
            } else {
                this.setState({ error: "" })
            }
        });
        //upload.start();

    }

    handleClick(e) {
        console.log(e.currentTarget.files[0])
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const upload = Resumes.insert({
                file: e.currentTarget.files[0],
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                console.log("uploaded");
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert(`Error during upload: ${error}`);
                } else {
                    alert(`File "${fileObj.name}" successfully uploaded`);
                }
                console.log("cancled");
            });
            upload.start();
        }
    }
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {

            Meteor.subscribe('files.images.all');
            this.setState({ resumes: Resumes })
            const cursor = Resumes.find().each();
            console.log("c", cursor)
            this.setState({ filesCursor: cursor })


            this.updateLinks();
            // this.renderLinks();
        })
    }
    componentWillUnmount() {
        this.tracker.stop();
    }

    updateLinks() {
        const links = [];
        Meteor.subscribe('files.images.all');
        console.log(this.state.Resumes)
        console.log("fileCursorstate", this.state.filesCursor);
        const fc = this.state.filesCursor;
        console.log(fc.length);
        let p = fc.map((aFile, key) => {
            let link = Resumes.findOne({ _id: aFile._id }).link();
            links.push(link);
        })
        this.setState({ links })
        let resume = this.state.links[this.state.links.length - 1];
        console.log("--->", resume);
        this.setState({ resume });
    }

    // renderLinks() {
    //     return this.state.links.map((link,key) => {
    //         return <h1 key={key}>{link}</h1>
    //     })
    // }

    render() {
        return (
            <div className="login-wrapper">
                <div className="Description-txt">
                    <h1>Signup page</h1>
                </div>
                <div className="wrapper form-wrapper">
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="text"
                            required={true}
                            className="form-input"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleChange} />
                        <input type="email"
                            className="form-input"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange} />
                        <input type="password"
                            className="form-input"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange} />
                        <input type="number"
                            required={true}
                            className="form-input"
                            name="phone"
                            placeholder="Phone Number"
                            onChange={this.handleChange} />
                        <input type="city"
                            className="form-input"
                            name="city"
                            placeholder="City"
                            onChange={this.handleChange} />
                        <input type="text"
                            className="form-input"
                            name="skills"
                            placeholder="enter your skill in comma seperation"
                            onChange={this.handleChange} />
                        <input type="file"
                            id="fileInput"
                            className="form-input"
                            name="resume"
                            placeholder="Upload Resume"
                            onChange={this.handleClick} />

                        <button type="submit" className="button" >Create Accounts</button>
                    </form>
                </div>

                {/* {this.renderLinks()} */}
            </div>
        );
    }
}
