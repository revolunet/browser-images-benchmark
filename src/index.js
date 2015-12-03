
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import Promise from 'bluebird';
import request from 'browser-request';
import tableify from 'tableify';

require('babel-polyfill');

import config from './config';
import utils from './utils';
import getDeviceInfos from './getDeviceInfos';

import imagesJSON from './images.json';


const TASKS = [{
    title: 'Load div with CSS class (base64)',
    task() {
        var div = document.createElement('div');
        div.className = utils.pickImageName();
        return Promise.resolve(utils.addToDom(tgt, div));
    }
},{
    title: 'Load div with CSS class (base64) + translateZ',
    task() {
        var div = document.createElement('div');
        div.className = utils.pickImageName();
        div.style.transform = 'translateZ(0)';
        div.style.webkitTransform = 'translateZ(0)';
        return Promise.resolve(utils.addToDom(tgt, div));
    }
},{
    title: 'Load div with base64 inline style',
    task() {
        var div = document.createElement('div');
        let b64 = imagesJSON[utils.pickImageName() + '.jpg'];
        div.style.backgroundImage = `url(${b64})`;
        return Promise.resolve(utils.addToDom(tgt, div));
    }
},{
    title: 'Load div with url inline style',
    task() {
        var div = document.createElement('div');
        div.style.backgroundImage = `url(${utils.pickImage()})`;
        return Promise.resolve(utils.addToDom(tgt, div));
    }
},{
    title: 'Load div with url inline style + translateZ',
    task() {
        var div = document.createElement('div');
        div.style.backgroundImage = `url(${utils.pickImage()})`;
        div.style.transform = 'translateZ(0)';
        div.style.webkitTransform = 'translateZ(0)';
        return Promise.resolve(utils.addToDom(tgt, div));
    }
},{
    title: 'Load img from URL',
    task: () => {
        return utils.loadImage()
                    .then(img => utils.addToDom(tgt, img));
    }
},{
    title: 'Load img from URL + translateZ',
    task: () => {
        return utils.loadImage()
                    .then(img => {
                        img.style.transform = 'translateZ(0)';
                        img.style.webkitTransform = 'translateZ(0)';
                        return img;
                    })
                    .then(img => utils.addToDom(tgt, img))
    }
},{
    title: 'Load img from JSON base64',
    task() {
        let b64 = imagesJSON[utils.pickImageName() + '.jpg'];
        return utils.loadImage({src: b64})
                    .then(img => utils.addToDom(tgt, img));
    }
},{
    title: 'Load img from JSON base64 + translateZ',
    task() {
        let b64 = imagesJSON[utils.pickImageName() + '.jpg'];
        return utils.loadImage({src: b64})
                    .then(img => {
                        img.style.transform = 'translateZ(0)';
                        img.style.webkitTransform = 'translateZ(0)';
                        return img;
                    })
                    .then(img => utils.addToDom(tgt, img));
    }
}];

function launchTask(task, count=100, onProgress) {
    return utils.repeat(count, task.task, onProgress);
}

var Select = React.createClass({
  render: function() {
    return <select defaultValue={ this.props.defaultValue } onChange={ this.props.onChange }>
            { this.props.options.map(function(option) {
               return <option key={ option } value={ option } >{ option }</option>;
               }) }
          </select>;
  }
})

var TaskRunner = React.createClass({
    getInitialState() {
        return {
            stats: null,
            loading: false
        }
    },
    start() {
        this.setState({
            loading: true
        }, () => {
            const progressCallback = (stats) => {
                if (this.props.onProgress) {
                    this.props.onProgress(stats);
                }
            }
            launchTask(this.props.task, this.props.iterations, progressCallback).then(stats => {
                this.setState({
                    loading: false,
                    stats: stats
                }, () => {
                    if (this.props.onFinished) {
                        this.props.onFinished(stats);
                    }
                });
            }).catch((e) => {
                console.error(e);
            });
        })
        
    },
    render() {
        return (
            <div>
                <button disabled={ this.state.loading } onClick={ this.start }>▶</button>
                &nbsp;
                <b>{ this.props.task.title}</b>
                &nbsp;&nbsp;
                { this.state.stats && <div style={ { display: 'inline-block', fontSize: 12 } } ref="result">
                total={ this.state.stats.duration }, avg={ this.state.stats.duration / this.state.stats.count }
                </div> }
                <br/>
                <pre>{ this.props.task.task.toString() }</pre>
                <br/><br/>
            </div>
        )
    }
});

var Tasks = React.createClass({
    getDefaultProps() {
        return {
            iterations: 100
        }
    },
    getInitialState() {
        return {
            count: 0
        }
    },
    componentDidMount() {
        this.iterations = findDOMNode(this.refs.iterations);
    },
    onFinished(stats) {
        // this.setState({
        //     count: this.state.count + stats.count
        // });
    },
    onProgress(stats) {
        this.setState({
            count: this.state.count + 1
        });
    },
    renderTask(task, i) {
        return <TaskRunner onFinished={ this.onFinished } onProgress={ this.onProgress } iterations={ this.iterations && parseInt(this.iterations.value, 10) || this.props.iterations } key={ i } task={ task }/>;
    },
    onIterationsChange() {
        this.forceUpdate();
    },
    clear() {
        document.getElementById('tgt').innerHTML = '';
    },
    render() {
        return (
            <div>
                Iterations : <Select ref="iterations" onChange={ this.onIterationsChange } options={ [1, 5, 10, 25, 50, 100, 200] } defaultValue={ this.props.iterations }></Select>
                &nbsp;&nbsp;
                <button onClick={ this.clear }>clear</button>
                &nbsp;&nbsp;
                Loaded : { this.state.count }
                <br/><br/>
                { this.props.tasks.map(this.renderTask) }
            </div>
        );
    }
});

var tasks = React.createElement(Tasks, {
    tasks: TASKS
});



ReactDOM.render(tasks, document.getElementById('root'));


var tgt = document.getElementById('tgt');

function updateDeviceInfos() {
    document.getElementById('device-info').innerHTML = tableify(getDeviceInfos());
}

updateDeviceInfos();

